const axios = require('axios');

exports.fetchCampgrounds = async (state, limit, offset) => {
    try {
        const response = await axios.get(process.env.CAMPGROUND_API_URL, {
            headers: {
                'Accept': 'application/json',
                'apiKey': process.env.RIDB_API_KEY
            },
            params: {
                state,
                limit,
                offset
            }
        });

        if (response.status === 200) {
            return formatResponse(response.data, limit, offset);
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Failed to fetch campground details',
            error: error.message
        });
    }
};

// Transform the response data to match the desired structure
const formatResponse = (data, limit, offset) => {
    const { METADATA, RECDATA } = data;

    const totalData = METADATA.RESULTS.TOTAL_COUNT;
    const totalPage = Math.ceil(totalData / limit);
    const currentPage = Math.floor((offset + 1) / limit) + 1;

    const formattedData = RECDATA.map(facility => ({
        id: facility.FacilityID,
        name: facility.FacilityName,
        description: facility.FacilityDescription,
        coordinates: facility.GEOJSON.COORDINATES || [0, 0],
        directions: facility.FacilityDirections,
        email: facility.FacilityEmail || "",
        phone: facility.FacilityPhone || "",
        media_urls: facility.MEDIA.map(media => media.URL)
    }));

    return {
        status: 200,
        message: 'Campground lists fetched successfully!',
        metadata: {
            total_data: totalData,
            limit: limit,
            offset: offset,
            page: currentPage,
            total_page: totalPage
        },
        data: formattedData
    };
};

exports.getCampgroundDetail = async (campground_id) => {
    try {
        const response = await axios.get(`${process.env.CAMPGROUND_API_URL}/${campground_id}`, {
            headers: {
                apikey: process.env.RIDB_API_KEY
            }
        });

        const data = response.data;

        const address = data.FACILITYADDRESS?.[0] || "";

        const formattedAddress = [
            address.City,
            address.AddressStateCode,
            address.AddressCountryCode,
            address.PostalCode
        ].filter(Boolean).join(', ');

        return {
            id: data.FacilityID,
            name: data.FacilityName,
            description: data.FacilityDescription,
            address: formattedAddress,
            latitute: data.FacilityLatitude,
            longitude: data.FacilityLongitude,
            directions: data.FacilityDirections,
            email: data.FacilityEmail || "",
            phone: data.FacilityPhone || "",
            media_urls: data.MEDIA?.map(media => media.URL) || []
        };
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Failed to fetch campground details',
            error: error.message
        });
    }
};
const fetch = require('node-fetch')
const { parseXmlList, parseXmlAttr } = require("../utils/xmlParser");

const API_KEY = process.env.CAMPGROUND_API_KEY;

exports.fetchCampgrounds = async (location, page = 1, limit = 10) => {
    if (!API_KEY) {
        return {
            status: 500,
            message: "Missing CAMPGROUND_API_KEY in environment variables.",
        };
    }

    try {
        const apiUrl = `https://api.amp.active.com/camping/campgrounds?pstate=${location}&siteType=2001&api_key=${API_KEY}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return {
                status: response.status,
                message: `API request failed with status ${response.status}`,
            };
        }

        const xmlData = await response.text();
        const parsed = parseXmlList(xmlData, {
            root: "resultset",
            itemTag: "result"
        });

        const results = parsed.items || [];
        const startIndex = (page - 1) * limit;
        const paginatedResults = results.slice(startIndex, startIndex + limit);

        return {
            status: 200,
            message: "Data fetched successfully",
            metadata: {
                total_data: results.length,
                page,
                limit,
                total_page: Math.ceil(results.length / limit),
                pstate: parsed.pstate || location,
                siteType: parsed.siteType || null,
                resultType: parsed.resultType || null
            },
            data: paginatedResults
        };
    } catch (error) {
        return {
            status: 500,
            message: "Server error: " + error.message,
        };
    }
};

exports.getCampgroundDetail = async (state, campground) => {
    try {
        const apiUrl = `https://www.reserveamerica.com/campgroundDetails.do?contractCode=${state}&parkId=${campground}&xml=true`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return {
                status: response.status,
                message: `API request failed with status ${response.status}`,
            };
        }

        const xmlData = await response.text();
        const results = parseXmlAttr(xmlData, {
            root: "detailDescription",
        });

        return {
            status: 200,
            message: "Data fetched successfully",
            data: results
        };
    } catch (error) {
        return {
            status: 500,
            message: "Server error: " + error.message,
        };
    }
}
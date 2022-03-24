/* This is a variable that is being exported to the rest of the application. */
export const API_URL = "https://623cc5bb7efb5abea686f4bd.mockapi.io/Items"

/**
 * Format a number as a price
 * @param number - The number to format.
 */
export const formatPrice = (number) =>
    Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(number / 100)

/**
 * Create a copy of an array
 * @param items - The array of items to be copied.
 */
export const createCopy = (items) => JSON.parse(JSON.stringify(items))

/**
 * Given an object and a key, return the sum of all values for that key in the object
 * @param object - The object to iterate over.
 * @param key - The key to sum by.
 */
export const sumByKey = (object, key) =>object.reduce((acc, cur) => cur[key] + acc, 0)
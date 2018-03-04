module.exports = {
    "extends": "airbnb",
    "rules": {
        "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["cxt"] }],
    }
};
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb", //使用airbnb規則
    "parserOptions": {
        "ecmaFeatures": {
            "parserOptions.ecmaVersion":true,
            "jsx": true
        },
        "sourceType":"module"
    },
    "plugins": [
        "react",
        "html",
        "jsx-a11y",
        "import"
    ],
    "rules": {
    }
};
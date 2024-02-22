module.exports = () => {
    if (process.env.APP_ENV === "clublahacienda")
    {
        return require('./organizations/clublahacienda/app.json')
    } 
    else if (process.env.APP_ENV === "laceiba")
    {
        return require('./organizations/laceiba/app.json')
    }
};
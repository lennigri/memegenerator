// casts data URI to buffer to save to server
// source: https://www.edureka.co/community/95996/how-do-i-parse-a-data-url-in-node

exports.parseURI = function(URI) {

    const regex = /^data:.+\/(.+);base64,(.*)$/;
    
    console.log("extracting file extension using uriParser.helper")
    const extension = URI.match(regex)[1];
    
    console.log("extracting data using uriParser.helper")
    const data = URI.match(regex)[2];

    console.log("parsing data to buffer using uriParser.helper")
    const buffer = Buffer.from(data, 'base64')

    return {image: buffer, extension: extension}
}
var http = require('http');
var url = require('url');
var fs= require('fs');
var server=http.createServer(function (req, res) {var url_parts=url.parse(req.url,true);
                                                  var query=url_parts.query;
                                                  //console.log(query.nume);
                       							  res.writeHead(200, {'Content-Type': 'text/plain'});
						 						  fs.appendFileSync('test1.txt', query.nume);
												  res.end(query.nume);
					  							}
							)
	server.listen(7000);
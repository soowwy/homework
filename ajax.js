/**
 * 
 */
var Ajax = {
	
	/**
	 * @return XMLHttpRequest
	 */
	createRequest: function() {
		var request;
		
		if (typeof XMLHttpRequest != 'undefined') {
			request = new XMLHttpRequest();
		} else if (typeof ActiveXObject != 'undefined') {
			request = new ActiveXObject('Microsoft.XMLHTTP');
		}
		
		if (typeof request == 'undefined') {
			throw new Error('Your browser does not support XML Http Requests');
		}
		
		return request;
	},

	/**
	 * 
	 * @param {String} method - GET/POST
	 * @param {String} url
	 * @param {Boolean} async - is the request asyncronious(true) or not(false) 
	 * @param {Function} hanlder
	 * @param {Object} params - keys for names, values for values 
	 * @param {String} username - optional
	 * @param {String} password - optional
	 */
	request: function(method, url, async, handler, params, username, password) {
		var xhr = this.createRequest();
		
		var params = this.parseParams(params);
		if (method == 'GET' && params.length) {
			url = this.addParamsToUrl(url, params);
		}
		
		
		xhr.open(method, url, async, username, password);
		if (method == 'POST') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		if (async) {
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && 
						((xhr.status >= 200 && xhr.status < 300) || 
						xhr.status == 304)) {
					handler(xhr.responseText);
				}
			}
		}
		
		var body = method == 'POST' ? params : null;
		xhr.send(body);
		console.log('Request sent');
		if (!async) {
			return xhr.responseText;			
		}
	},
	
	/**
	 * 
	 * @param params
	 */
	parseParams: function(params) {
		var result = [];
		for (var i in params) {
			result.push(
					encodeURIComponent(i) + '=' + encodeURIComponent(params[i])
			);
		}
		
		return result.join('&');
	},
	
	addParamsToUrl: function(url, params) {
		/// alabala.com?a=b&min=1&max=5
		if (url.lastIndexOf('?') == url.length - 1) {
			return url + params;
		} 
		
		if (url.lastIndexOf('&') == url.length - 1) {
			return url + params;
		}
		
		if (url.lastIndexOf('?') != -1 && 
				url.lastIndexOf('?') != url.length - 1 && 
				url.lastIndexOf('&') != url.length - 1) {
			return url + '&' + params;
		} 
		
		if (url.indexOf('?') == -1) {
			return url + '?' + params;
		}
		
	}

}
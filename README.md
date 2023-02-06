<center><b><a href="https://youtu.be/AXFochV8XyY" target="_blank">Watch Demo and Overview</a></b></center>

## Installation Docker

- Clone it `git@github.com:shohel/news-frontend.git`
- Copy Backend/API application's URL. and update the `baseURL` and `apiBaseURL` from `index/php` (if you like to run it directly from server) and `public/index.html` (for Docker)
- Your base URL will resemble const `siteData = {baseURL: 'http(s)://example-api-url/', apiBaseURL: 'http(s)://example-api-url/api/'}`, note that you have to append /api/ for API requests.
- Change path tho this project root from the terminal `cd /path/to/news-frontend`
- Build new docker image `docker build -t news-frontend .`
- Start new container `docker run -dp 3000:3000 news-frontend .`

At this point, you should see the application.

## Installation Manual

- Clone it `git@github.com:shohel/news-frontend.git`
- Copy Backend/API application's URL. and update the `baseURL` and `apiBaseURL` from `index/php` (if you like to run it directly from server) and `public/index.html` (for Docker)
- Your base URL will resemble const siteData = {baseURL: 'http(s)://example-api-url/', apiBaseURL: 'http(s)://example-api-url/api/'}, note that you have to append /api/ for API requests.
- Change path tho this project root from the terminal `cd /path/to/news-frontend`
- Run command `npm install`
- Run command `npm run build`
- Browse the URL in root (`index.php`), please not you need to run it within server.

At this point, you should see the application.

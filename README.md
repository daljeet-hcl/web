# GurbaniNow Website [![badge](https://img.shields.io/badge/Powered%20By-GurbaniNow-blue.svg)](https://github.com/GurbaniNow)

Website: https://gurbaninow.com

Uses GurbaniNow API: https://github.com/GurbaniNow/api

## Build Instructions

Make sure you have [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [`php`](https://secure.php.net/manual/en/install.php), and [`composer`](https://getcomposer.org/doc/00-intro.md) installed on your system.

#### Open terminal and follow these steps:

### Step 1: Clone the Repo

```bash
git clone https://github.com/GurbaniNow/web.git
```

You should now see a folder named `web` in your present working directory. Let's change directory into it.

```bash
cd web
```

### Step 2: Install Dependencies

```bash
composer install
```

This uses the `composer` package manager to install the required `php` dependencies for the project.

### Step 3: Start the Project

```bash
php -S localhost:8888 -t public public/index.php
```

This will use `php`'s built-in web-server to serve the project on port `:8888`.

### Step 4: Access local dev website

[`http://localhost:8888`](http://localhost:8888)

### Running the project on a webserver

Please check [SlimPHP](https://www.slimframework.com/)'s documentation [here](https://www.slimframework.com/docs/v3/start/web-servers.html)

## License

```
GurbaniNow.com Copyright (C) 2015-2018 GurbaniNow Dev Team. All Rights Reserved.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, as per version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```

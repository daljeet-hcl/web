<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(['settings' => $config]);

$container = $app->getContainer();

$container['view'] = function ($c) {
    return new \Slim\Views\PhpRenderer('../src/html/');
};
$container['cache'] = function ($c) {
    return new \Slim\HttpCache\CacheProvider();
};
$container['packer'] = function ($c) {
	return function($script, $encoding, $fastDecode, $specialChars, $removeSemicolons) {
		return new Tholu\Packer\Packer($script, $encoding, $fastDecode, $specialChars, $removeSemicolons);
    };
};

//APP VERSION
$container['version'] = '1.3.1-0';

$app->get('/', function (Request $request, Response $response, array $args) {
	return $this->view->render($response, 'main.html', [
		'version' => $this->version
	]);
});

$app->group('/assets', function() {
    $this->get('/js/{version}/{filename}', function (Request $request, Response $response, array $args) {
		$filename = $args['filename'];
		$file = file_get_contents("../src/js/$filename");
		$packer = $this->packer;
		$packedjs = $packer($file, 'Normal', true, false, true)->pack();
		$response = $this->cache->allowCache($response, 'public', 31536000);
		$response = $this->cache->withEtag($response, md5($packedjs), 'weak');
		$response = $response->withHeader('Content-Type', 'application/javascript; charset=utf-8')
			->write($packedjs);
		return $response;
    });
    $this->get('/css/{version}/{filename}', function (Request $request, Response $response, array $args) {
		$filename = $args['filename'];
		$file = file_get_contents("../src/css/$filename");
		$response = $this->cache->allowCache($response, 'public', 31536000);
		$response = $this->cache->withEtag($response, md5($file), 'weak');
		$response = $response->withHeader('Content-Type', 'text/css; charset=utf-8')
			->write($file);
		return $response;
    });
});

$app->group('/shabad', function() {
    $this->get('[/]', function (Request $request, Response $response, array $args) {
		$shabadid = rand(1, 5540);
		return $response->withRedirect("https://gurbaninow.com/shabad/$shabadid", 302);
    });
    $this->get('/random', function (Request $request, Response $response, array $args) {
		$shabadid = rand(1, 5540);
		return $response->withRedirect("https://gurbaninow.com/shabad/$shabadid", 302);
    });
    $this->get('/{shabadid:[0-9]+}[/]', function (Request $request, Response $response, array $args) {
		return $this->view->render($response, 'shabad.html', [
			'version' => $this->version,
			'shabadid' => $args['shabadid'],
			'id' => ''
		]);
    });
    $this->get('/{shabadid:[0-9]+}/{id:[0-9]+}[/]', function (Request $request, Response $response, array $args) {
		return $this->view->render($response, 'shabad.html', [
			'version' => $this->version,
			'shabadid' => $args['shabadid'],
			'id' => $args['id']
		]);
    });
});

$app->get('/page/{pageno:[0-9]+}[/]', function (Request $request, Response $response, array $args) {
	$source = $request->getQueryParam('sourceid', 'G');
	return $this->view->render($response, 'page.html', [
		'version' => $this->version,
		'pageno' => $args['pageno'],
		'sourceid' => $source
	]);
});

$app->get('/hukamnama', function (Request $request, Response $response, array $args) {
	return $this->view->render($response, 'hukamnama.html', [
		'version' => $this->version
	]);
});

$app->group('/about', function() {
    $this->get('[/]', function (Request $request, Response $response, array $args) {
		return $this->view->render($response, 'about.html');
    });
    $this->get('/opensource[/]', function (Request $request, Response $response, array $args) {
		return $this->view->render($response, 'oss.html');
    });
    $this->get('/terms[/]', function (Request $request, Response $response, array $args) {
		return $this->view->render($response, 'tos.html');
    });
});

$app->run();
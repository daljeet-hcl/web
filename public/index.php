<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$config['displayErrorDetails'] = false;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(['settings' => $config]);

$container = $app->getContainer();

//APP VERSION
$container['version'] = '1.3.1-8';

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

$app->get('/', function (Request $request, Response $response, array $args) {
	return $this->view->render($response, 'main.html', [
		'version' => $this->version
	]);
});

$app->group('/assets', function() {
    $this->get('/js/{version}/{filename}', function (Request $request, Response $response, array $args) {
		$filename = $args['filename'];
		$name = realpath("../src/js/$filename");
		if (substr($name, 0, strlen(dirname($name))) === dirname($name)) {
			@$file = file_get_contents($name);
		}
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
		$name = realpath("../src/css/$filename");
		if (substr($name, 0, strlen(dirname($name))) === dirname($name)) {
			@$file = file_get_contents($name);
		}
		$file = str_replace('<?= $version ?>', $args['version'], $file);
		$response = $this->cache->allowCache($response, 'public', 31536000);
		$response = $this->cache->withEtag($response, md5($file), 'weak');
		$response = $response->withHeader('Content-Type', 'text/css; charset=utf-8')
			->write($file);
		return $response;
    });
    $this->get('/fonts/{version}/{encoding}/{font}/{weight}/{filename}', function (Request $request, Response $response, array $args) {
		$filename = $args['encoding'].'/'.$args['font'].'/'.$args['weight'].'/'.$args['filename'];
		$name = realpath("../src/fonts/$filename");
		if (substr($name, 0, strlen(dirname($name))) === dirname($name)) {
			@$file = new \GuzzleHttp\Psr7\LazyOpenStream($name, 'r');
		}
		$response = $this->cache->allowCache($response, 'public', 31536000);
		$response = $this->cache->withEtag($response, md5($file));
		$response = $response->withHeader('Content-Type', 'application/octet-stream')
			->withHeader('Content-Length', filesize($name))
			->withBody($file);
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
	$source = $request->getQueryParam('source', 'G');
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
		return $this->view->render($response, 'about.html', [
			'version' => $this->version
		]);
	});
    $this->get('/terms[/]', function (Request $request, Response $response, array $args) {
		return $this->view->render($response, 'tos.html');
    });
    $this->get('/privacy[/]', function (Request $request, Response $response, array $args) {
		return $this->view->render($response, 'privacy.html');
    });
});

$app->group('/present', function() {
    $this->get('[/]', function (Request $request, Response $response, array $args) {
		return $this->view->render($response, 'present.html', [
			'version' => $this->version
		]);
    });
    $this->get('/view[/]', function (Request $request, Response $response, array $args) {
		return $this->view->render($response, 'view.html', [
			'version' => $this->version
		]);
    });
});

$app->run();
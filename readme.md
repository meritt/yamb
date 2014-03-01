# Yamb

[![NPM version](https://badge.fury.io/js/yamb.png)](http://badge.fury.io/js/yamb) [![Build Status](https://travis-ci.org/yamb/yamb.png?branch=master)](https://travis-ci.org/yamb/yamb) [![Coverage Status](https://coveralls.io/repos/yamb/yamb/badge.png)](https://coveralls.io/r/yamb/yamb) [![Code Climate](https://codeclimate.com/github/yamb/yamb.png)](https://codeclimate.com/github/yamb/yamb) [![Dependency Status](https://david-dm.org/yamb/yamb.png)](https://david-dm.org/yamb/yamb) [![devDependency Status](https://david-dm.org/yamb/yamb/dev-status.png)](https://david-dm.org/yamb/yamb#info=devDependencies)

Currently you must use the `--harmony` flag when running node 0.11.x to get access to generators.

You can chat with me. Thanks to [gitter](https://gitter.im/yamb/yamb).

[![Gitter chat](https://badges.gitter.im/yamb/yamb.png)](https://gitter.im/yamb/yamb)

## Installation

```bash
$ npm install yamb
```

## Examples

```js
var co = require('co');

var mongo = require('co-easymongo')({
  dbname: 'test'
});

var yamb = require('yamb')({
  storage: mongo.collection('posts')
});

co(function *() {
  var post = yamb.create({
    title: 'Yamb header',
    text: 'Yamb markdown **text**'
  });

  post = yield post.save();

  console.log(post.json());
})();
```

## API

### Yamb

### Options

* `storage` (object) — mongodb driver, for example [co-easymongo](https://github.com/meritt/co-easymongo) or any related.
* `yapi` (string) — api key for [yandex translate service](http://api.yandex.ru/translate/) (optional).

### Methods

* `create([data])` — returns a new instance of the [Yamb class](#yamb-class).
* `fetch([params][, options])` — find document via `params` and return [Yamb instance](#yamb-class).
* `fetchAll([params][, options])` — find documents via `params` and return array of [Yamb instance](#yamb-class).
* `remove([params])` — remove documents.

### Yamb class

### Methods

* `update(params)` — update all the properties from `params`.
* `save()` — save all data to storage.
* `remove()` — remove from storage.
* `reset()` — reset all changes.
* `similar()` — returns an array of similar Yamb's.
* `next([with_inactive])` — returns next Yamb, if not found returns false.
* `prev([with_inactive])` — returns previous Yamb, if not found returns false.
* `html(text)` — convert markdown text to html.
* `json([only_updated])` — returns all properties in json format.

## Author

* [Alexey Simonenko](mailto:alexey@simonenko.su), [simonenko.su](http://simonenko.su)

## License

The MIT License, see the included `license.md` file.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/yamb/yamb/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
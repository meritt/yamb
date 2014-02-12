var co = require('co');

it('should create a new object', function(done) {
  co(function *() {
    var a = new Yamb();

    a.update(data.create);

    a = yield a.save();

    a.should.be.ok;
    a.id.should.equal(10);
    a.uri.should.equal(utils.yambUri(a.created, 'a-panhandlers-guide-to-business-life-love'));
    a.title.should.equal('Pay People What They’re Worth');

    done();
  })();
});

it('should update an existing object', function(done) {
  co(function *() {
    var a = new Yamb(data.update);

    a.tags = a.tags.concat(['marketing']);
    a.active = false;

    a = yield a.save();

    a.should.be.ok;
    a.id.should.equal(data.update._id);
    a.uri.should.equal(data.update.uri);
    a.title.should.equal(data.update.title);
    a.preview.should.equal(data.update.preview);
    a.text.should.equal(data.update.text);
    a.tags.should.containEql('business');
    a.tags.should.containEql('marketing');
    a.active.should.equal(false);

    done();
  })();
});

it('should auto create uri from translation service', function(done) {
  co(function *() {
    var a = new Yamb();

    a.title = 'Заголовок 2014';
    a.text = ' \n\n text 1\n\ntext 2   \n\n\n  \n \n  ';

    a = yield a.save();

    a.should.be.ok;
    a.id.should.equal(10);
    a.uri.should.equal(utils.yambUri(a.created, 'title-2014'));
    a.preview.should.equal('text 1');
    a.text.should.equal('text 1\n\ntext 2');

    done();
  })();
});

it('should throw error if text empty', function(done) {
  co(function *() {
    var a = new Yamb();
    var e = null;

    a.title = 'title';

    try {
      a = yield a.save();
    } catch (err) {
      a = false;
      e = err;
    }

    e.should.not.equal(null);
    e.should.be.an.instanceof(Error);
    a.should.not.be.ok;

    done();
  })();
});

it('should throw error if title empty', function(done) {
  co(function *() {
    var a = new Yamb();
    var e = null;

    a.text = ' \n\n text 1\n\ntext 2   \n\n\n  \n \n  ';

    try {
      a = yield a.save();
    } catch (err) {
      a = false;
      e = err;
    }

    e.should.not.equal(null);
    e.should.be.an.instanceof(Error);
    a.should.not.be.ok;

    done();
  })();
});
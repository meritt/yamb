describe('EMT typographer', function() {
  var should = require('should');
  var co = require('co');

  var data = require('./_data/data');
  var Yamb = require('./helpers/yamb');

  it('should update title', function(done) {
    co(function *() {
      var a = new Yamb();
      a.update(data.create);

      a.title = '"May the force be with you."';

      a = yield a.save();

      a.should.be.ok;
      a.title.should.equal('«May the force be with you.»');

      done();
    })();
  });

  it('should update text and preview', function(done) {
    co(function *() {
      var a = new Yamb();
      a.update(data.create);

      a.preview = '"The force" - is a magical power that gives people strength.';
      a.text = '"The force" - is a magical power that gives people strength.';

      a = yield a.save();

      a.should.be.ok;
      a.preview.should.equal('«The force» — is a magical power that gives people strength.');
      a.text.should.equal('«The force» — is a magical power that gives people strength.');

      done();
    })();
  });
});
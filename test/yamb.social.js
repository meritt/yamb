var poor = utils.unexpected({bool: true, arr: true, num: true, str: true});
var defaults = schema.data.social;

function assert(a, title, description, image, cover) {
  a.social.should.be.an.instanceof(Object);
  a.social.should.have.properties(['title', 'description', 'image', 'cover']);

  a.social.title.should.equal(title);
  a.social.description.should.equal(description);
  a.social.image.should.equal(image);
  a.social.cover.should.equal(cover);
}

it('should works', function() {
  var a = new Yamb();

  a.social = {title: 'Social title'};
  assert(a, 'Social title', '', '', '');
});

it('should updated from an object', function() {
  var a = new Yamb();

  a.social = {
    title: 'Social title ',
    image: 'cover.png',
    description: ' \n Description text  ',
    social: 'buttons'
  };

  assert(a, 'Social title', 'Description text', 'cover.png', '');

  a.social = {
    title: '',
    cover: '\n \n cover.png'
  };

  assert(a, '', 'Description text', 'cover.png', 'cover.png');
});

it('should not be able to delete a property', function() {
  var a = new Yamb();
  a.social = {title: 'Social title'};

  delete a.social.title;
  a.social.title.should.equal('Social title');

  var social = a.social;

  delete social.title;
  a.social.title.should.equal('Social title');
});

it('should not update with unexpected values from constructor', function() {
  var a;

  for (var i=0, length=poor.length; i<length; i++) {
    a = new Yamb({social: poor[i]});
    assert(a, defaults.title, defaults.description, defaults.image, defaults.cover);
  }

  a = new Yamb({social: {
    title: 'Title',
    image: 'cover.png',
    description: 'Description text',
    url: 'http://simonenko.su',
    cover: 'image.png'
  }});

  assert(a, defaults.title, defaults.description, defaults.image, defaults.cover);
});

it('should not update with unexpected values from setter', function() {
  var a;

  for (var i=0, length=poor.length; i<length; i++) {
    a = new Yamb();
    a.social = poor[i];

    assert(a, defaults.title, defaults.description, defaults.image, defaults.cover);
  }
});
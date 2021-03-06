var poor = utils.unexpected({bool: true, arr: true, num: true, str: true});
var defaults = schema.data.meta;

function assert(a, title, description, keywords) {
  a.meta.should.be.an.instanceof(Object);
  a.meta.should.have.properties(['title', 'description', 'keywords']);

  a.meta.title.should.equal(title);
  a.meta.description.should.equal(description);
  a.meta.keywords.should.equal(keywords);
}

it('should works', function() {
  var a = new Yamb();

  a.meta.title = '  Title  ';
  a.meta.description = ' Description text';
  a.meta.keywords = 'keyword 1, keyword 2 ';

  assert(a, 'Title', 'Description text', 'keyword 1, keyword 2');
});

it('should updated from an object', function() {
  var a = new Yamb();

  a.meta = {
    title: 'Title ',
    image: 'cover.png',
    description: ' \n Description text  ',
    social: 'buttons'
  };

  assert(a, 'Title', 'Description text', '');

  a.meta = {
    title: '',
    keywords: '\n \n keyword 1, keyword 2'
  };

  assert(a, '', 'Description text', 'keyword 1, keyword 2');
});

it('should not be able to delete a property', function() {
  var a = new Yamb();
  a.meta = {title: 'Title'};

  delete a.meta.title;
  a.meta.title.should.equal('Title');

  var meta = a.meta;

  delete meta.title;
  a.meta.title.should.equal('Title');
});

it('should not update with unexpected values from constructor', function() {
  var a;

  for (var i=0, length=poor.length; i<length; i++) {
    a = new Yamb({meta: poor[i]});
    assert(a, defaults.title, defaults.description, defaults.keywords);
  }

  a = new Yamb({meta: {
    title: 'Title',
    image: 'cover.png',
    description: 'Description text',
    keywords: 'keyword 1, keyword 2'
  }});

  assert(a, defaults.title, defaults.description, defaults.keywords);
});

it('should not update with unexpected values from setter', function() {
  var a;

  for (var i=0, length=poor.length; i<length; i++) {
    a = new Yamb();
    a.meta = poor[i];

    assert(a, defaults.title, defaults.description, defaults.keywords);
  }
});

it('should not set property with unexpected values', function() {
  var a;

  for (var i=0, length=poor.length; i<length; i++) {
    if (typeof poor[i] == 'string') {
      continue;
    }

    a = new Yamb();

    a.meta.title = poor[i];
    a.meta.description = poor[i];
    a.meta.keywords = poor[i];

    assert(a, defaults.title, defaults.description, defaults.keywords);
  }
});
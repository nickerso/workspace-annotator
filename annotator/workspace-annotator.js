var rdfGraph = {
  'http://example.org/about': {
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': [{
      'value': 'http://xmlns.com/foaf/0.1/Document',
      'type': 'uri'
    }],
    'http://purl.org/dc/terms/title': [{
      'value': "Anna's Homepage",
      'type': 'literal',
      'lang': 'en'
    }],
    'http://purl.org/dc/terms/creator': [{ 'value': '_:person', 'type': 'bnode' }],
    'http://purl.org/dc/terms/subject': [{
      'value': 'http://example.com/chemistry',
      'type': 'uri'
    }],
  },
  '_:person': {
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': [{
      'value': 'http://xmlns.com/foaf/0.1/Person',
      'type': 'uri'
    }],
    'http://xmlns.com/foaf/0.1/firstName': [{ 'value': 'Anna', 'type': 'literal' }],
    'http://xmlns.com/foaf/0.1/surname': [{ 'value': 'Wilder', 'type': 'literal' }]
  },
  'http://example.org/about2': {
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': [{
      'value': 'http://xmlns.com/foaf/0.1/Document',
      'type': 'uri'
    }]
  }
};

const itemStore = new rdforms.ItemStore();

const bundles = [
  ['templates/dcterms.json'],
  ['templates/foaf.json'],
  ['templates/skos.json'],
  ['templates/adms.json'],
  ['templates/vcard.json'],
  ['templates/dcat_props.json'],
  ['templates/dcat.json'],
];

const graph = new rdfjson.Graph(rdfGraph);

rdforms.bundleLoader(itemStore, bundles, function(bundles) {
  new rdforms.Editor({
    graph,
    resource: 'http://example.org/about',
    template: itemStore.getItem('dcat:OnlyDataset'),
    compact: false,
    includeLevel: 'optional'
  }, 'node');
  var ta = document.getElementById('output');
  var updateOutput = function() {
    // Export RDF/XML
    ta.value = rdfjson.converters.rdfjson2rdfxml(graph);

    // Export RDF/JSON
    // ta.value = JSON.stringify(graph.exportRDFJSON(), null, "  ");
  };
  updateOutput();
  graph.onChange = updateOutput;
});

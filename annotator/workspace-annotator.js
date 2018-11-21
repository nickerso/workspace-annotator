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
	  // grab workspace URL
	  var url = document.getElementById('workspace-url').value;
	  console.log(url);
	  console.log("log message");
	  console.log(graph);
	  var oldAbout = Object.keys(graph._graph)[0];
	  console.log(oldAbout);
	  if (oldAbout !== url) {
		  Object.defineProperty(graph._graph, url, Object.getOwnPropertyDescriptor(graph._graph, oldAbout));
		  delete graph._graph[oldAbout];
	  }
	  console.log(graph);
    // Export RDF/XML
    ta.value = rdfjson.converters.rdfjson2rdfxml(graph);

    // Export RDF/JSON
    // ta.value = JSON.stringify(graph.exportRDFJSON(), null, "  ");
  };
  updateOutput();
  graph.onChange = updateOutput;
});

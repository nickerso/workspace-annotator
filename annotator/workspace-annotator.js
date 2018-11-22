var rdfGraph = {
  'http://example.org/about': {
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': [{
      'value': 'https://models.physiomeproject.org/ns/1.0/Workspace',
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
  ['templates/pmr-workspace.json'],
];

const graph = new rdfjson.Graph(rdfGraph);

rdforms.bundleLoader(itemStore, bundles, function(bundles) {
  new rdforms.Editor({
    graph,
    resource: 'http://example.org/about',
    template: itemStore.getItem('pmr:Workspace'),
    compact: false,
    includeLevel: 'optional'
  }, 'node');
  var ta = document.getElementById('output');
  var updateOutput = function() {
	  // grab workspace URL
	  var url = document.getElementById('workspace-url').value;
	  var oldAbout = Object.keys(graph._graph)[0];
	  if (oldAbout !== url) {
		  Object.defineProperty(graph._graph, url, Object.getOwnPropertyDescriptor(graph._graph, oldAbout));
		  delete graph._graph[oldAbout];
	  }
	  // Export RDF/XML
    ta.value = rdfjson.converters.rdfjson2rdfxml(graph);

    // Export RDF/JSON
    // ta.value = JSON.stringify(graph.exportRDFJSON(), null, "  ");
  };
  updateOutput();
  graph.onChange = updateOutput;
});


var Test;
(function (Test) {
    // simple test plugin for messing with the nav bar
    Test.pluginName = 'test';
    Test.templatePath = 'test/html';
    Test.log = Logger.get(Test.pluginName);
    Test._module = angular.module(Test.pluginName, []);
    var tab = null;
    var tab2 = null;
    Test._module.config(['$routeProvider', 'HawtioNavBuilderProvider', '$locationProvider', function ($routeProvider, builder, $locationProvider) {
        $locationProvider.html5Mode(true);
        tab = builder.create()
                     .id(Test.pluginName)
                     .title(function () { return "Test"; })
                     .href(function () { return "/test1"; })
                     .subPath("Sub Page 1", "page1", builder.join(Test.templatePath, 'page1.html'))
                     .subPath("Sub Page 2", "page2", builder.join(Test.templatePath, 'page2.html'))
                     .subPath("Sub Page 3", "page3", builder.join(Test.templatePath, 'page3.html'))
                     .build();

        tab2 = builder.create()
                      .id(builder.join(Test.pluginName, '2'))
                      .title(function () { return "Test2"; })
                      .href(function () { return "/test2"; })
                      .page(function () { return builder.join(Test.templatePath, 'page1.html'); })
                      .build();
        builder.configureRouting($routeProvider, tab);
        builder.configureRouting($routeProvider, tab2);
    }]);
    Test._module.run(["HawtioNav", "$timeout", function (HawtioNav, $timeout) {
        Test.log.debug('loaded');
        HawtioNav.add(tab);
        HawtioNav.add(tab2);
    }]);
    hawtioPluginLoader.addModule(Test.pluginName);
})(Test || (Test = {}));

angular.module("test").run(["$templateCache", function($templateCache) {$templateCache.put("test/html/page1.html","<div class=\"row\">\n  <div class=\"col-md-12\">\n    <h1>Page 1</h1>\n    <p>foo</p>\n  </div>\n</div>\n");
$templateCache.put("test/html/page2.html","<div class=\"row\">\n  <div class=\"col-md-12\">\n    <h1>Page 2</h1>\n  </div>\n</div>\n");
$templateCache.put("test/html/page3.html","<div class=\"row\">\n  <div class=\"col-md-12\">\n    <h1>Page 3</h1>\n  </div>\n</div>\n");}]);
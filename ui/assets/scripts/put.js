  
  var featureData = window.featureData
  var timeline = Parse.Object.extend("timeline");

  var featureObjects = []
  function saveFeatures() {
      var obj = this
      var f = new timeline()
      f.set("index", 1)
      f.set("father_name", "tom")
      f.set("son_name", "trev")
      f.set("son_age", '10')
      f.set("father_age", '10')
      f.save(null, {
        success : function(object) {
          console.log("Feature saved with objectId " + object.id);
          featureObjects.push(object)
        },
        error : function(model, error) {
          console.log(error.message);
        }
      });
  }
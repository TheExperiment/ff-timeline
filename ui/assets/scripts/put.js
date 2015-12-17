
  var featureData = window.featureData
  var timeline = Parse.Object.extend("timeline");

  var featureObjects = []
  function saveTimeline() {
      console.log(userObj);
      var obj = this
      var f = new timeline()
      f.set("index", userObj.index)
      f.set("father_name", userObj.dadName)
      f.set("son_name", userObj.sonName)
      f.set("son_age", userObj.sonAge)
      f.set("father_age", userObj.dadAge)
      f.save(null, {
        success : function(object) {
          console.log("Feature saved with objectId " + object.id);
          window.location.hash = object.id;
          featureObjects.push(object)
        },
        error : function(model, error) {
          console.log(error.message);
        }
      });
  }
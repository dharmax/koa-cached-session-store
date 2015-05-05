
module.exports = function( persistentStore ) {
 
  var cache = {};
  
  return {
    load: function(sid) { 
      var e = cache[sid];
      return e || persistentStore.load(sid);
    },
    save: function (sid, data) {
      cache[sid] = data;
      return persistentStore.save(sid, data);
    },
    remove: function(sid) {
      delete cache[sid];
      return persistentStore.remove(sid);
    }
  }  
}
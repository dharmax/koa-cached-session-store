'use strict' 

module.exports = function( persistentStore ) {
  
  var cache = {};
  
  this.get = function * (sid) { 
    let e = cache[sid];
    if(!e) {
      e = yield persistentStore.get(sid);
    }
    return e;
  };
  this.set = function * (sid, session, ttl) {
    cache[sid] = session;
    let r = yield persistentStore.set(sid, session, ttl);
    return r;
  };
  this.destroy = function * (sid) {
    delete cache[sid];
    return persistentStore.destroy(sid);
  }

  return this;
}
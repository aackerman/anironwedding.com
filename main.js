(function(){
  var defaultWhitelist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function generateRandomString(len, whitelist) {
    whitelist = whitelist || defaultWhitelist;
    if (len <= 0) throw new Error('Must use a positive length');
    var text = '';
    while ( len-- ) {
      text += whitelist.charAt(Math.floor(Math.random() * whitelist.length));
    }
    return text;
  }

  var Fb = new Firebase("https://brilliant-fire-5854.firebaseio.com/");
  function onSubmit(e) {
    e.preventDefault();
    var btn = document.getElementById('submitBtn');
    var errContainer = document.getElementById('errContainer');
    var originalBtnText = btn.innerText;
    btn.disabled = true;
    btn.innerText = 'Sending...';

    var childRef = Fb.child(generateRandomString(20));

    childRef.set({
      decliners: document.querySelector('textarea[name=decliners]').value,
      attendees: document.querySelector('textarea[name=attendees]').value,
      dietaryNeeds: document.querySelector('textarea[name=dietaryNeeds]').value
    }, function(err){
      if (err === null) {
        btn.innerText = 'Sent!';
      } else {
        errContainer.innerText = 'There was an error, please try again';
        btn.innerText = originalBtnText;
        btn.disabled = false;
      }
    });

  }
  var f = document.getElementById('rsvpForm');
  f.onsubmit = onSubmit;
})();


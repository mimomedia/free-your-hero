function mimoInit() {
	"use strict"
    var results = [];
    // Get the container element
    var container = document.getElementsByClassName('mimo-question');
    var count = container.length;
    for (i = 0; i < count; ++i) {
    	// Find checked inputs values in each container
        var inputs = container[i].getElementsByTagName('input');
        for (var index = 0; index < inputs.length; ++index) {
            if (inputs[index].checked) {
            	// Save results in array
                results.push(inputs[index].value);
                // Add but not repeat class to answered question container
                container[i].classList.remove('mimo-answered');
                container[i].classList.add('mimo-answered');
            }

        }
    }
    // If any of the questions if answered
    if (results.length > 0) {
    	// Get the most repeated result in results array
        var repeated = {};
        var max = 0;
        var result;
        for (var n in results) {
            repeated[results[n]] = (repeated[results[n]] || 0) + 1;
            if (repeated[results[n]] > max) {
                max = repeated[results[n]];
                result = results[n];
            }
        }
        // Percentage of quiz completed
		var questions = document.getElementsByClassName('mimo-answered').length,
            percentage = questions * 100 / count;
        // Update progress bar
		document.getElementById('mimo-progress-bar').style.width = percentage + '%';
		var bottomResult = document.getElementById('mimo-bottom');
        var bottomResultDiv = document.getElementById('mimo-result-bottom');
        
        if (percentage === 100) {
        	// The quiz is finished
            document.getElementById('mimo-progress').style.display = 'none';
            // Show bottom results
            bottomResult.style.display = 'block';	
            bottomResultDiv.innerHTML = '<h2 class="mimo-activist">' + mimoResult(result) + '</h2><p class="mimo-lead">Congratulations, you ended the research, we found that the hero inside you is a <strong>' + mimoResult(result) + '</strong>, so you can go the next step and free him!</p>';

        } else {
        	// The quiz is not finished 
        	// Show bottom results 
            bottomResult.style.display = 'block';
            bottomResultDiv.innerHTML = '<p class="mimo-lead">You have completed ' + percentage + '% of the challenge. By now you seem to have a <strong>' + mimoResult(result) + '</strong> inside.</p><p>Finish the quiz to find your inside living <strong>Hero</strong> or take action right now.</p>';

        }
        // Social buttons
        var facebookButton = document.getElementById('mimo-facebook'),
            twitterButton = document.getElementById('mimo-twitter'),
            url = window.location.href;

        facebookButton.onclick = function() {
            window.open('http://www.facebook.com/sharer.php?u=' + url);
        }

        twitterButton.onclick = function() {
            window.open('https://twitter.com/share?url=' + url);
        }

    }


}

// Find activist type based on given value
function mimoResult(value) {
	"use strict"
    switch (value) {
        case 'a':
            var activistType = 'Cyberactivist';
            break;
        case 'b':
            var activistType = 'Solar Generation Activist';
            break;
        case 'c':
            var activistType = 'Volunteer';
            break;
        case 'd':
            var activistType = 'Donator';
            break;

    }
    return activistType;
}

// Restart application
function mimoRestart() {
	"use strict"
    var input = document.getElementsByTagName('input');
    // Set to false all inputs
    for (var i = 0; i < input.length; i++) input[i].checked = false;
    // Hide bottom results
    document.getElementById('mimo-bottom').style.display = 'none';
    // Hide progress bar
	document.getElementById('mimo-progress').style.display = 'none';
	// Initialize progress bar
    document.getElementById('mimo-progress-bar').style.width = '0';
    // Remove answered classes
    var container = document.getElementsByClassName('mimo-question');
    for (i = 0; i < container.length; ++i) { container[i].classList.remove('mimo-answered') };
    mimoInit();
}

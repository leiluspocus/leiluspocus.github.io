/**
 * Memory Game
 * @author leiluspocus
 */

var Memory = function() {
    this.timer = false;
    this.pairFounds = 0;

    this.startGame = function() {
        this.timer = new Date();
        $('#start_game').hide();
        $('#memory').show();
    }

    this.checkPair = function(item1, item2) {
        if ( $(item1).data('pair') == $(item2).data('pair') ) {
            this.pairFounds = this.pairFounds + 1;
            $(item1).removeClass("notfound");
            $(item2).removeClass("notfound");
            if ( this.pairFounds == 6 ) {
                this.stopTimer();
            }
            this.addNotification("Paire trouvée, bravo!", true);
        }
        else {
            setTimeout(function() {
                $(item1).css("opacity", 0);
                $(item2).css("opacity", 0);
            }, 1500);
            this.addNotification("Pas la bonne paire bizuth!", false);
        }
    }

    this.revealElement = function(image) {
        $(image).find(".em").css("opacity", "1");
        /* Fetch visible elements */
        var visibleElements = $('.notfound[style*="opacity: 1"]');
        if ( visibleElements.length == 2 ) {
            this.checkPair(visibleElements[0], visibleElements[1]);
        }
    }

    this.stopTimer = function() {
        var endTime = new Date();
        var resultTime = (endTime - this.timer) / 1000;
        $('#notification').append('<p class="bg-success">Jeu fini en '+ resultTime + ' secondes !</p>');
    }

    this.addNotification = function(message, success) {
        if ( !success ) {
            $('#notification').append('<p id="vanish" class="bg-warning">'+ message +'</p>');
        }
        else {
            $('#notification').append('<p id="vanish" class="bg-success">'+message+'</p>');
        }
        setTimeout(function() {
            $('#vanish').remove();
        }, 1000);
    }

};

$( document ).ready(function() {

    Memory.prototype = new Memory();
    var game = new Memory();

    jQuery('#start_game').on("click", function() {
        game.startGame();
    });

    jQuery('.image').on("click", function() {
        game.revealElement(this);
    });

});
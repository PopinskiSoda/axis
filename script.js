$(function() {
    var
        WIDTH = 875,
        HEIGHT = 83+150,
        draw,
        a,
        b,
        sumAB,
        $equation;

    function randInt(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    function getArrowXCoords(start, end) {
        var
            zeroX = 35,
            deltaX = 39;

        return [zeroX + start * deltaX, zeroX + end * deltaX];
    }

    function getArrowYCoord(start, end) {
        return HEIGHT - 83 + 20 - Math.round(12 * (end - start));
    }

    function generatePathString(start, end) {
        var
            xCoords = getArrowXCoords(start, end),
            startX = xCoords[0],
            endX = xCoords[1],
            top = getArrowYCoord(start, end),
            bottom = HEIGHT - 83 + 20,
            bezierRounding = Math.round((endX - startX) / 4);

        return "M" + startX + "," + bottom + " C" + (startX+bezierRounding)+ "," + top +
               " " + (endX-bezierRounding) + "," + top + " " + endX + "," + bottom + "";
    }

    function placeInput($input, arrow) {
        var 
            x = arrow.x() + Math.round(arrow.width() / 2) - 10,
            y = arrow.y() - 25 - 7;

        $input.css({"left": x, "top": y});
    }

    function drawArrow(start, end) {
        var x = draw
            .path(generatePathString(start, end))
            .attr({
                'fill-opacity': 0,
                'stroke': '#b3527f',
                'stroke-width': 2
            })
            .marker('end', 20, 20, function(add) {
                add.path("M6,9 L10,10 L6,11").attr({
                    'fill-opacity': 0,
                    'stroke': '#b3527f',
                    'stroke-width': 1
                });
            });
        return x;
    }

    function handleInputChange(correctValue, $spanToHighlight) {
        if (+this.val() === correctValue) {
            $spanToHighlight.removeClass("invalid");
            this.prop('disabled', true);
            return true;
        }
        $spanToHighlight.addClass("invalid");
        return false;
    }

    function handleAInputChange() {
        var
            arrowB,
            $inputB = $('.js-b-input');

        if (handleInputChange.apply(this, arguments)) {
            arrowB = drawArrow(a, sumAB);
            $inputB.removeClass('dn').removeProp('disabled').focus();
            placeInput($inputB, arrowB);
        }
    }

    function handleBInputChange() {
        if (handleInputChange.apply(this, arguments)) {
            $('.js-answer-input').val('').removeProp('disabled').focus();
        }
    }

    function listener() {
        $(document)
            .on('change', '.js-a-input', handleAInputChange.bind($('.js-a-input'), a, $('.js-a')))
            .on('change', '.js-b-input', handleBInputChange.bind($('.js-b-input'), b, $('.js-b')))
            .on('change', '.js-answer-input', handleInputChange.bind($('.js-answer-input'), sumAB, $('.js-answer-input')))
    }

    function init() {
        var arrowA;

        draw = SVG('drawing').size(WIDTH, HEIGHT),
        $a = $('.js-a'),
        $b = $('.js-b'),
        sumAB = randInt(11,14),
        a = randInt(6,9),
        b = sumAB - a;

        $a.text(a);
        $b.text(b);
        
        arrowA = drawArrow(0, a);
        placeInput($('.js-a-input'), arrowA);

        listener();
    }

    init();
});
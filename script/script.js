$(document).ready(function() {
    var current_fs, next_fs, previous_fs;
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $("input").on("keyup", function() {
        var form = $(this).parents("form");
        var submitEnable = false;
        form.find("input").each(function() {
            if ($(this).val() != "") {
                submitEnable = true;
            } else {
                submitEnable = false;
                return false;
            }
        });
        if (submitEnable) {
            form.find(".btn-primary.next").removeClass("disabled");
        } else {
            form.find(".btn-primary.next").addClass("disabled");
        }
    });

    $(".next").click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(event.target).parents("form").eq(0).addClass("was-validated");
        if ($(event.target).parents("form").eq(0)[0].checkValidity() && $(event.target).hasClass("tab-switch")) {
            $(event.target).parents(".tab-pane.fade").removeClass("show active");
            $(".tab-pane.fade").eq(1).addClass("show active");
            $("#profile-tab").removeClass("active");
            $("#spouse-tab").addClass("active");
        } else if ($(event.target).parents("form").eq(0)[0].checkValidity()) {
            current_fs = $(this).parents("fieldset");
            next_fs = $(this).parents("fieldset").next();
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
            next_fs.show();
            current_fs.hide();
            setProgressBar(++current);
        }
    });

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
    }
});
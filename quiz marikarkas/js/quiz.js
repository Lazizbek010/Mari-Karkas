document.querySelector(".quiz").addEventListener("submit", function (e) {
    e.preventDefault();

    $('#form-send-successfully-popup').fadeIn();

    $(".quiz__final__btn__text").hide();
    $(".btn__load").show();
    $(".btn.quiz__final__btn").prop("disabled", true).addClass("loading");

    var form = new FormData(this);

    setTimeout(() => {
        $.ajax({
            url: myajax.url,
            data: form,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (response) {

            },
            error: function (error) {
                console.error("Ошибка отправки формы:", error);
                $(".btn.quiz__final__btn").prop("disabled", false).removeClass("loading");
            }
        });

        const telegramToken = "6962137833:AAEFYiC6zg78FB543kZKBgByqbqc2WNJRt8";
        const chatId = "-1002178646676";
        let message = "Новая заявка из квиза:\n";
        form.forEach((value, key) => {
            if (['Тип', 'Площадь', 'Допы', 'Когда', 'Бюджет', 'Подарок', 'Куда', 'Номер'].includes(key)) {
                message += `<b>${key}</b>: ${value}\n`;
            }
        });

        $.ajax({
            url: `https://api.telegram.org/bot${telegramToken}/sendMessage`, method: "POST", dataType: "json", data: {
                chat_id: chatId, text: message, parse_mode: "HTML"
            }, success: function (response) {
                console.log("Сообщение успешно отправлено", response);
                ym(92966510, 'reachGoal', 'quiz_complete');
                $(".btn.quiz__final__btn").removeClass("loading").prop("disabled", false);
                location.reload();
            }, error: function (error) {
                console.error("Ошибка отправки в Telegram:", error);
                $(".btn.quiz__final__btn").removeClass("loading").prop("disabled", false);
            }
        });
    }, 1000);
});

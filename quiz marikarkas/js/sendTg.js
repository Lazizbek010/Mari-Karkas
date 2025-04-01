$(".form-consult__form").submit(function (e) {
    e.preventDefault();

    // $('#form-send-successfully-popup').fadeIn();

    var form = new FormData(this);

    $(".btn__load").show();
    $(".form-consult__btn-text").hide();

    $.ajax({
        url: myajax.url,
        data: form,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (response) {
            $('#form-send-successfully-popup').fadeIn();
        },
    });

    const telegramToken = "6962137833:AAEFYiC6zg78FB543kZKBgByqbqc2WNJRt8";
    const chatId = "-1002178646676";
    let message = "Консультация из квиза:\n";
    form.forEach((value, key) => {
        message += `<b>${key}</b>: ${value}\n`;
    });

    $.ajax({
        url: `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        method: "POST",
        dataType: "json",
        data: {
            chat_id: chatId,
            text: message,
            parse_mode: "HTML"
        },
        success: function (response) {
            console.log("Сообщение успешно отправлено", response);
        },
        error: function (error) {
            console.error("Ошибка отправки", error);
        }
    });
});

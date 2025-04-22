<?php
// Überprüfen, ob das Formular abgeschickt wurde
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Formulardaten abrufen und bereinigen
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
    
    // Überprüfen, ob die Datenschutzerklärung akzeptiert wurde
    if (!isset($_POST["privacy-consent"])) {
        echo json_encode(["success" => false, "message" => "Bitte stimmen Sie der Datenschutzerklärung zu."]);
        exit;
    }
    
    // Validierung
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["success" => false, "message" => "Bitte füllen Sie alle Pflichtfelder aus."]);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Bitte geben Sie eine gültige E-Mail-Adresse ein."]);
        exit;
    }
    
    // E-Mail-Empfänger
    $to = "manuel.fadljevic@gmail.com";
    
    // Betreff
    $subject = "Neue Kontaktanfrage von " . $name;
    
    // HTML-E-Mail erstellen
    $htmlContent = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Neue Kontaktanfrage</title>
        <style>
            body {
                font-family: "Inter", Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                background-color: #f9f9f9;
            }
            .container {
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                margin: 20px 0;
            }
            .header {
                background-color: #3B82F6;
                color: white;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            .info-row {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
            }
            .info-label {
                font-weight: bold;
                color: #666;
            }
            .message-content {
                background-color: #f5f5f5;
                padding: 15px;
                border-radius: 5px;
                margin-top: 10px;
            }
            .footer {
                background-color: #f5f5f5;
                padding: 15px;
                text-align: center;
                font-size: 12px;
                color: #999;
            }
            .logo {
                max-width: 150px;
                margin: 0 auto;
                display: block;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Neue Kontaktanfrage</h2>
            </div>
            <div class="content">
                <div class="info-row">
                    <div class="info-label">Name:</div>
                    <div>' . htmlspecialchars($name) . '</div>
                </div>
                <div class="info-row">
                    <div class="info-label">E-Mail:</div>
                    <div><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Nachricht:</div>
                    <div class="message-content">' . nl2br(htmlspecialchars($message)) . '</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Datenschutzzustimmung:</div>
                    <div>Erteilt</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Gesendet am:</div>
                    <div>' . date('d.m.Y H:i') . ' Uhr</div>
                </div>
            </div>
            <div class="footer">
                Diese Nachricht wurde über das Kontaktformular Ihrer Website gesendet.
            </div>
        </div>
    </body>
    </html>
    ';
    
    // Plain-Text Alternative für E-Mail-Clients, die kein HTML unterstützen
    $plainText = "Neue Kontaktanfrage\n\n";
    $plainText .= "Name: " . $name . "\n";
    $plainText .= "E-Mail: " . $email . "\n";
    $plainText .= "Nachricht: " . $message . "\n";
    $plainText .= "Datenschutzzustimmung: Erteilt\n";
    $plainText .= "Gesendet am: " . date('d.m.Y H:i') . " Uhr\n";
    
    // E-Mail-Header
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // E-Mail senden
    $mailSuccess = mail($to, $subject, $htmlContent, $headers);
    
    // Antwort zurückgeben
    if ($mailSuccess) {
        echo json_encode(["success" => true, "message" => "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet."]);
    } else {
        echo json_encode(["success" => false, "message" => "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."]);
    }
} else {
    // Wenn die Seite direkt aufgerufen wird
    echo json_encode(["success" => false, "message" => "Ungültiger Zugriff."]);
}
?>
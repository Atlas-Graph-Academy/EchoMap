import csv
import smtplib
import os
import sys
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_emails():
    sender_email = os.environ.get('EMAIL_ACCOUNT')
    sender_password = os.environ.get('EMAIL_PASSWORD')

    if not sender_email or not sender_password:
        print("Error: EMAIL_ACCOUNT and EMAIL_PASSWORD environment variables are required.")
        return

    sender_password = sender_password.replace(" ", "")

    subject = "Read Lenny's memory graph — 30 seconds"
    
    plain_template = """Hi —

Kobe here. Building the memory network out of Marina, SF.

We turned memory into a new form of reading. Try it:

https://www.iditor.com/memory-graph

You'll see Lenny Rachitsky's thinking mapped as a constellation — Rory Sutherland on first-principles marketing, Jeff Weinstein's "burning problem" thesis at Stripe, Mihika Kapoor quietly outperforming billion-dollar CTOs in reach.

https://i.imgur.com/BDONbb8.gif

Click any node. Watch the pattern of how one mind actually evolved.

This is the fastest way to understand someone. And we're just getting started.

We're raising a $2M seed. Team is built. Product is live. Based in SF. Happy to meet for coffee.

You have two options:

1. Become our user — you'll end up here eventually.
2. Become our investor — and sit front row for what comes next.

Pick one. Reply. I'm here.

Kobe
EchoChat — San Francisco"""

    html_template = """<html>
<body>
<p>Hi —</p>

<p>Kobe here. Building the memory network out of Marina, SF.</p>

<p>We turned memory into a new form of reading. Try it:</p>

<p><a href="https://www.iditor.com/memory-graph" target="_blank">https://www.iditor.com/memory-graph</a></p>

<p>You'll see Lenny Rachitsky's thinking mapped as a constellation — Rory Sutherland on first-principles marketing, Jeff Weinstein's "burning problem" thesis at Stripe, Mihika Kapoor quietly outperforming billion-dollar CTOs in reach.</p>

<p><img src="https://i.imgur.com/BDONbb8.gif" alt="Memory graph visual demo"></p>

<p>Click any node. Watch the pattern of how one mind actually evolved.</p>

<p>This is the fastest way to understand someone. And we're just getting started.</p>

<p>We're raising a $2M seed. Team is built. Product is live. Based in SF. Happy to meet for coffee.</p>

<p>You have two options:</p>

<p>1. Become our user — you'll end up here eventually.<br>
2. Become our investor — and sit front row for what comes next.</p>

<p>Pick one. Reply. I'm here.</p>

<p><a href="https://www.linkedin.com/in/echochat/" target="_blank">Kobe</a><br>
<a href="https://apps.apple.com/us/app/echochat/id6736381852" target="_blank">EchoChat</a> — San Francisco</p>
</body>
</html>"""

    csv_path = sys.argv[1] if len(sys.argv) > 1 else 'gold_mine_next_batch.csv'
    
    try:
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            recipients = list(reader)
    except FileNotFoundError:
        print(f"CSV file not found at {csv_path}.")
        return

    print(f"Loaded {len(recipients)} recipients from {csv_path}.")

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.ehlo()
        server.starttls()
        server.login(sender_email, sender_password)
        
        for idx, row in enumerate(recipients, 1):
            raw_email = row.get('email', '').strip()
            if not raw_email:
                continue
                
            email_list = [e.strip() for e in raw_email.split(' or ')]
            
            msg = MIMEMultipart('alternative')
            msg['From'] = f"Kobe <{sender_email}>"
            msg['To'] = ", ".join(email_list)
            msg['Subject'] = subject
            
            msg.attach(MIMEText(plain_template, 'plain', 'utf-8'))
            msg.attach(MIMEText(html_template, 'html', 'utf-8'))
            
            print(f"[{idx}/{len(recipients)}] Sending email to {msg['To']}...")
            server.sendmail(sender_email, email_list, msg.as_string())
            
            # Simple delay to avoid rate limiting
            time.sleep(2)
            
        server.quit()
        print("All emails sent successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    send_emails()

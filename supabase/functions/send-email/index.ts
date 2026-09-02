import { Webhook } from "npm:standardwebhooks@1.0.0";
import nodemailer from "npm:nodemailer@7.0.5";

const hookSecret = (Deno.env.get("SEND_EMAIL_HOOK_SECRET") ?? "").replace(
  "v1,whsec_",
  "",
);

const gmailUser = Deno.env.get("GMAIL_USER") ?? "";
const gmailAppPassword = Deno.env.get("GMAIL_APP_PASSWORD") ?? "";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: gmailUser,
    pass: gmailAppPassword,
  },
});

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers);

    const wh = new Webhook(hookSecret);

    const { user, email_data } = wh.verify(payload, headers) as {
      user: {
        email: string;
      };
      email_data: {
        token: string;
        token_hash: string;
        redirect_to: string;
        email_action_type: string;
        site_url: string;
        token_new: string;
        token_hash_new: string;
      };
    };

    const {
      token,
      token_hash,
      redirect_to,
      email_action_type,
      site_url,
    } = email_data;

    const email = user.email;

    const confirmationUrl =
    `${Deno.env.get("SUPABASE_URL")}/auth/v1/verify?token=${encodeURIComponent(token_hash)}` +
      `&type=${encodeURIComponent(email_action_type)}` +
      `&redirect_to=${encodeURIComponent(redirect_to)}`;

    let subject = "【徐媽媽冰鑽滷味】請確認您的電子郵件";

    let title = "歡迎加入徐媽媽冰鑽滷味";

    let message =
      "感謝您註冊徐媽媽冰鑽滷味會員。為了完成註冊，請確認您的電子郵件地址。";

    if (email_action_type === "recovery") {
      subject = "【徐媽媽冰鑽滷味】密碼重設";
      title = "密碼重設";
      message = "您申請了徐媽媽冰鑽滷味會員密碼重設，請點擊下方按鈕繼續操作。";
    } else if (email_action_type === "magiclink") {
      subject = "【徐媽媽冰鑽滷味】登入連結";
      title = "會員登入";
      message = "請點擊下方按鈕登入徐媽媽冰鑽滷味會員帳號。";
    } else if (email_action_type === "email_change") {
      subject = "【徐媽媽冰鑽滷味】確認電子郵件變更";
      title = "確認電子郵件變更";
      message = "請點擊下方按鈕確認您的電子郵件變更。";
    }

    const html = `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:Arial,'Microsoft JhengHei',sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;padding:40px 30px;box-shadow:0 2px 10px rgba(0,0,0,0.08);">
    
    <h1 style="color:#8b4513;text-align:center;margin-bottom:30px;">
      徐媽媽冰鑽滷味
    </h1>

    <h2 style="color:#333333;">
      ${title}
    </h2>

    <p style="font-size:16px;line-height:1.8;color:#555555;">
      親愛的會員您好：
    </p>

    <p style="font-size:16px;line-height:1.8;color:#555555;">
      ${message}
    </p>

    <div style="text-align:center;margin:35px 0;">
      <a
        href="${confirmationUrl}"
        style="display:inline-block;background:#8b4513;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:16px;font-weight:bold;"
      >
        ${email_action_type === "recovery" ? "重設我的密碼" : "確認我的電子郵件"}
      </a>
    </div>

    <p style="font-size:14px;line-height:1.7;color:#888888;">
      如果這不是您本人進行的操作，請忽略此封信件。
    </p>

    <hr style="border:none;border-top:1px solid #eeeeee;margin:30px 0;">

    <p style="font-size:14px;line-height:1.7;color:#999999;text-align:center;">
      徐媽媽冰鑽滷味<br>
      感謝您的支持與信任
    </p>

  </div>
</body>
</html>
`;

    const text = `
徐媽媽冰鑽滷味

${title}

親愛的會員您好：

${message}

請使用以下連結完成操作：
${confirmationUrl}

如果這不是您本人進行的操作，請忽略此封信件。

徐媽媽冰鑽滷味
感謝您的支持與信任
`;

    await transporter.sendMail({
      from: `"徐媽媽冰鑽滷味" <${gmailUser}>`,
      to: email,
      subject,
      text,
      html,
    });

    return new Response(JSON.stringify({}), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Send email error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to send email",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
});
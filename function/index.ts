import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import crypto from "crypto";

admin.initializeApp();

export const vnpayCallback = functions.https.onRequest(async (req, res) => {
  const secureHash = req.query.vnp_SecureHash as string;
  delete req.query.vnp_SecureHash;

  const signData = new URLSearchParams(req.query as any).toString();
  const hmac = crypto.createHmac("sha512", functions.config().vnpay.secret);
  const checkHash = hmac.update(signData).digest("hex");

  if (secureHash === checkHash) {
    const [userId, courseId] = (req.query.vnp_OrderInfo as string).split("|");

    await admin.firestore().doc(`users/${userId}`).update({
      courses: admin.firestore.FieldValue.arrayUnion(courseId),
    });

    res.send("OK");
  } else {
    res.status(400).send("INVALID");
  }
});

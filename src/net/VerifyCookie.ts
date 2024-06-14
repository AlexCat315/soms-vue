import http from "@/net/ApiService";

async function verifyCookie(): Promise<boolean> {
  let url = "/api/account/check-login";
  try {
        const data = await http
            .get(url);
        return data.code === 200;
    } catch (err) {
        return false;
    }
}


export default verifyCookie;
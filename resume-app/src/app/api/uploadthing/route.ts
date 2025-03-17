import { createRouteHandler } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const handler = createRouteHandler({
  router: ourFileRouter,
});

export { handler as GET, handler as POST }; 
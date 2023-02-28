import { Context } from "./common.js";

import createOkrs from "./create-okrs.js";
import deleteOkrsByOwners from "./delete-okrs-by-owners.js";
import deleteOkrsByIds from "./delete-okrs-by-ids.js";
import createUsers from "./create-users.js";
import detectDuplicates from "./detect-duplicates.js";

export default (context: Context) => {
  createOkrs(context);
  deleteOkrsByOwners(context);
  deleteOkrsByIds(context);
  createUsers(context);
  detectDuplicates(context);
};

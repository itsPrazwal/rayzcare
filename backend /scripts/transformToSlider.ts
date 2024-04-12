/* eslint-disable no-console */
import { getCliClient } from "@sanity/cli";
import { Transaction } from "@sanity/client";

type Doc = {
  _id: string;
  _rev: string;
  modules: Array<T>;
};

type DocPatch = {
  id: string;
  patch: {
    set: { modules: Array<T> };
    ifRevisionID: string;
  };
};

// Gets the client configuration from `sanity.cli.ts` and returns a client.
// Will include write token when run with `sanity exec --with-user-token`
const client = getCliClient();

// Fetch the documents we want to migrate, and return only the fields we need.
const fetchDocuments = () =>
  client.fetch(
    `*[_type == 'service' && defined(modules)][0...300] {_id, _rev, modules}`
  );

// Build a patch for each document, represented as a tuple of `[documentId, patch]`
const buildPatches = (docs: Doc[]) =>
  docs.map(
    (doc: Doc): DocPatch => ({
      id: doc._id,
      patch: {
        set: {
          modules: [
            {
              _key: "5G5QBG1r7X3fBhEikj",
              _type: "moduleSlider",
              medias: doc.modules
            },
          ],
        },
        // this will cause the migration to fail if any of the documents has been
        // modified since it was fetched.
        ifRevisionID: doc._rev,
      },
    })
  );

const createTransaction = (patches: DocPatch[]): Transaction =>
  patches.reduce(
    (tx: Transaction, patch: DocPatch) => tx.patch(patch.id, patch.patch),
    client.transaction()
  );

const commitTransaction = (tx: Transaction) => tx.commit();

const migrateNextBatch = async (): Promise<void> => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);
  if (patches.length === 0) {
    console.log("No more documents to migrate!");
    process.exit(1);
  }
  console.log(
    `Migrating batch:\n %s`,
    patches
      .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join("\n")
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch((err: any) => {
  console.error(err);
  process.exit(1);
});

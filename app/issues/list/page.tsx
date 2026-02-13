import Pagination from "@/app/components/Pagination";
import { Status } from "@/generated/prisma/client";
import { prisma } from "@/prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const searchURLParams = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(searchURLParams.status)
    ? searchURLParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchURLParams.orderBy)
    ? { [searchURLParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchURLParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchURLParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";
export default IssuesPage;

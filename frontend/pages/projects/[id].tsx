import Head from "next/head";
import { ProjectDetailModel } from "shared/models/ProjectModel";
import { useRouter } from "next/router";
import useSWR from "swr";

const getProjectUrl = (id?: string | string[]): null | string =>
  id ? `/projects/${id}` : null;
const getTechUrl = (id?: string | string[]) =>
  id ? `/techs?project=${id}` : null;

export default function ProjectDetailPage() {
  const router = useRouter();
  const project = useSWR<ProjectDetailModel>(getProjectUrl(router.query.id));
  const techs = useSWR(getTechUrl(router.query.id));

  if (!project.data || !techs.data) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>Project - {project.data.name}</title>
      </Head>
      <code>
        <pre>{JSON.stringify(techs.data, null, 4)}</pre>
      </code>
      <code>
        <pre>{JSON.stringify(project.data, null, 4)}</pre>
      </code>
    </div>
  );
}

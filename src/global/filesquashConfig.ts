declare const filesquashConfig: any;

function validateProjectId(projectId: string){
  const isBlank = typeof projectId == null;
  const has8chars = typeof projectId === 'string' && projectId.length === 8;
  if (isBlank) { throw new Error('projectId: required') };
  if (!has8chars) { throw new Error('projectId: invalid') };
}


(function validateFilesquashConfig({ projectId }) {
  validateProjectId(projectId);
}(filesquashConfig))

export default filesquashConfig;

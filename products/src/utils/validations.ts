export function formatErrorDetails(parseResult: any): string {
  return parseResult.error.issues
    .map((issue: any) => `${issue.path.join('.')} ${issue.message}`)
    .join(', ');
}

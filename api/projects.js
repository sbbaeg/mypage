
// Vercel Serverless Function
// 이 파일은 Vercel에 배포될 때 서버 측에서만 실행되는 API가 됩니다.
export default async function handler(request, response) {
  // 환경 변수에서 Vercel API 토큰을 가져옵니다.
  const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

  // 토큰이 설정되지 않았을 경우 에러를 반환합니다.
  if (!VERCEL_API_TOKEN) {
    return response.status(500).json({ error: 'Vercel API token is not configured.' });
  }

  try {
    // Vercel API에 프로젝트 목록을 요청합니다.
    const apiResponse = await fetch('https://api.vercel.com/v9/projects', {
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
      },
    });

    // Vercel API로부터의 응답이 실패했을 경우 에러를 처리합니다.
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return response.status(apiResponse.status).json({ 
        error: `Failed to fetch from Vercel API. Status: ${apiResponse.status}, Message: ${errorText}` 
      });
    }

    const data = await apiResponse.json();
    const projects = data.projects || [];

    // 프론트엔드에 필요한 데이터만 추출하여 가공합니다.
    const projectDetails = projects.map(p => ({
      id: p.id,
      name: p.name,
      // 가장 최신 배포의 URL을 사용합니다.
      url: p.latestDeployments?.[0]?.url ? `https://${p.latestDeployments[0].url}` : null,
      framework: p.framework,
      updatedAt: p.updatedAt,
    }));

    // 성공적으로 데이터를 반환합니다.
    return response.status(200).json(projectDetails);

  } catch (error) {
    // 그 외 네트워크 오류 등을 처리합니다.
    return response.status(500).json({ error: `An internal error occurred: ${error.message}` });
  }
}

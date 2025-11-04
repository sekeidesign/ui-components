export interface ContributionDay {
	date: string;
	contributionCount: number;
	color: string;
}

export interface ContributionWeek {
	contributionDays: ContributionDay[];
}

export async function getContributions(
	username: string,
): Promise<ContributionWeek[]> {
	const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query,
			variables: { login: username },
		}),
		next: { revalidate: 3 }, // cache for 1 hour
	});

	const json = await res.json();

	console.log(json);

	return json.data.user.contributionsCollection.contributionCalendar.weeks;
}

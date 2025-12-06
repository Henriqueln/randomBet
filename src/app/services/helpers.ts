import { ActiveTeam, Team } from "../models/team";

export function mapActiveTeams(activeTeams: ActiveTeam[], teams: Team[]): ActiveTeam[] {
  const teamMap = new Map<string, Team>();

  // Create a map for quick lookup by Team.id
  teams.forEach(team => {
    teamMap.set(team._id!, team);
  });

  // Merge ActiveTeam with corresponding Team data
  return activeTeams.map(active => {
    const baseTeam = teamMap.get(active.teamId); // use teamId for lookup
    if (baseTeam) {
      return {
        ...baseTeam,       // spread full team data
        ...active           // overwrite/add ActiveTeam-specific fields
      };
    }
    // If no match found, return active as is
    return active;
  });
}
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import type { Resume } from '@/types/resume';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #2563eb',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1e40af',
  },
  contactInfo: {
    fontSize: 9,
    color: '#4b5563',
    flexDirection: 'row',
    gap: 10,
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
    borderBottom: '1 solid #93c5fd',
    paddingBottom: 3,
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 1,
  },
  date: {
    fontSize: 9,
    color: '#6b7280',
  },
  bullet: {
    fontSize: 10,
    marginLeft: 12,
    marginBottom: 3,
    lineHeight: 1.4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    padding: '4 8',
    borderRadius: 3,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#374151',
    marginBottom: 10,
  },
});

interface ResumePDFProps {
  resume: Resume;
}

export default function ResumePDF({ resume }: ResumePDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with contact info */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.name}</Text>
          <View style={styles.contactInfo}>
            <Text>{resume.email}</Text>
            {resume.phone && <Text>• {resume.phone}</Text>}
            {resume.location && <Text>• {resume.location}</Text>}
            {resume.linkedin && <Text>• LinkedIn</Text>}
            {resume.github && <Text>• GitHub</Text>}
          </View>
        </View>

        {/* Summary */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.summary}>{resume.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={styles.skillsContainer}>
              {resume.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {resume.experience && resume.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
            {resume.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </Text>
                  </View>
                  <Text style={styles.date}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                {exp.bullets && exp.bullets.map((bullet, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {bullet}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {resume.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <View style={styles.jobHeader}>
                  <View>
                    <Text style={styles.jobTitle}>
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </Text>
                    <Text style={styles.company}>
                      {edu.institution}
                      {edu.location && ` • ${edu.location}`}
                    </Text>
                  </View>
                  <Text style={styles.date}>{edu.graduationDate}</Text>
                </View>
                {edu.gpa && (
                  <Text style={{ fontSize: 9, color: '#6b7280', marginTop: 2 }}>
                    GPA: {edu.gpa}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            {resume.projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={styles.jobTitle}>{project.name}</Text>
                <Text style={{ fontSize: 10, marginTop: 2, marginBottom: 3 }}>
                  {project.description}
                </Text>
                {project.bullets && project.bullets.map((bullet, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {bullet}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            {resume.certifications.map((cert, index) => (
              <Text key={index} style={styles.bullet}>
                • {cert}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

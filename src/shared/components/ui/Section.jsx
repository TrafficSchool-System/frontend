/**
 * ==========================================
 * SECTION COMPONENT
 * ==========================================
 * Komponent för att strukturera innehåll i sektioner
 *
 * ANVÄNDNING:
 * <Section>
 *   <Section.Title>Rubrik</Section.Title>
 *   <Section.Description>Beskrivning</Section.Description>
 *   <Section.Content>
 *     Innehåll här
 *   </Section.Content>
 * </Section>
 */

const Section = ({ children, className = "" }) => {
  return <section className={`space-y-4 ${className}`}>{children}</section>;
};

Section.Title = ({ children, className = "" }) => {
  return (
    <h2 className={`text-2xl font-bold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

Section.Description = ({ children, className = "" }) => {
  return <p className={`text-gray-600 ${className}`}>{children}</p>;
};

Section.Content = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

export default Section;

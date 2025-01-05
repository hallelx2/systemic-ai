interface TestimonialCardProps {
  quote: string;
  name: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name }) => {
  return (
    <div className="cyberpunk-card p-6 rounded-lg">
      <p className="text-foreground/80 mb-4">"{quote}"</p>
      <p className="font-semibold neon-text">- {name}</p>
    </div>
  );
};

export default TestimonialCard;

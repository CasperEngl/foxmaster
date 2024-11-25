import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import type { TestimonialsBlock as TestimonialsBlockType } from "@/payload-types";
import React from "react";

export const TestimonialsBlock: React.FC<TestimonialsBlockType> = (props) => {
  return (
    <div className="container my-16">
      <TestimonialCarousel testimonials={props.testimonials} />
    </div>
  );
};

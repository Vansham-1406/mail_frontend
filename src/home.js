import React from "react";
// PARTICLE JS START
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
// PARTICLE JS END

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
  }, []);

  const navigate = useNavigate();

  return (
    <div className="home_banner position-relative">
      <>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#1f263b",
              },
            },
            fpsLimit: 120,
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: false,
                  mode: "bubble",
                },
                onclick: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 0.5,
                  },
                },
                bubble: {
                  distance: 400,
                  size: 4,
                  duration: 0.3,
                  opacity: 1,
                  speed: 3,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
                push: {
                  particles_nb: 4,
                },
                remove: {
                  particles_nb: 2,
                },
              },
            },
            particles: {
              number: {
                value: 52,
                density: {
                  enable: true,
                  value_area: 631.3280775270874,
                },
              },
              color: {
                value: "#fff",
              },
              shape: {
                type: "triangle",
                stroke: {
                  width: 0,
                  color: "#000000",
                },
              },
              opacity: {
                value: 0.5,
                random: true,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 5,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false,
                },
              },
              line_linked: {
                enable: false,
                distance: 500,
                color: "#ffffff",
                opacity: 0.4,
                width: 2,
              },
              move: {
                enable: true,
                speed: 1.5,
                direction: "bottom",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            detectRetina: true,
          }}
        />
      </>
      <img
        src="../logo.png"
        style={{ height: "90px", width: "100px" }}
        className="d-flex justify-content-center align-items-center"
        alt="mailiefy logo"
      />
      <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column text-light text-center">
        <p className="fs-6 fw-bold">Welcome to Mail Server!</p>
        <p className="fs-6">Login/Sigup to send mails freely!</p>
        <div className="d-flex justify-content-center mt-2">
          <button
            className="me-3 btn btn-success ps-3 pe-3"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <button
            className="ms-3 btn btn-success ps-3 pe-3"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

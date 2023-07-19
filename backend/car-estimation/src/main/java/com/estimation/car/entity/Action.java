package com.estimation.car.entity;

public enum Action {
    ENABLE("ENABLE"),
    DISABLE("DISABLE"),
    ADD("ADD"),
    DELETE("DELETE");

    private final String action;

    Action(String action) {
        this.action = action;
    }

    public String getAction() {
        return action;
    }
}
